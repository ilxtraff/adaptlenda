<?php
session_start();

/* ==== 1) Конфиг ==== */
$AD_API_URL   = 'http://m1.top/send_order/';
$AD_API_KEY   = 'c2ebbd2089f761d316394e4b53189412';
$PRODUCT_ID   = 16389;
$REF          = 1028188;

/* --- Facebook CAPI --- */
// Токен берётся из параметров кампании Keitaro (fb_token).
// Fallback: можно задать вручную здесь.
$FB_CAPI_TOKEN = '';

/* Глобальный антидубль */
$DEDUP_ENDPOINT = 'https://fixdoublecode.site/check-phone';
$DEDUP_PARTNER  = 'm1';
$DEDUP_OFFER    = 'ArtiZynt';

/* ==== 2) Данные формы ==== */
$name      = $_POST['name']            ?? $_GET['name']            ?? '';
$phone     = $_POST['phone']           ?? $_GET['phone']           ?? '';
$full      = $_POST['full_phone']      ?? $_GET['full_phone']      ?? ''; // от intl-tel-input (если есть)
$country   = strtoupper($_POST['country'] ?? $_GET['country']      ?? '');
$pixel     = $_POST['pixel']           ?? $_GET['pixel']           ?? '';
$fbToken   = $_POST['fb_token']       ?? $_GET['fb_token']        ?? ''; // CAPI token из Keitaro
$clickId   = $_POST['subid']           ?? $_GET['subid']           ?? ''; // aff_click_id
$utmSource = $_POST['utm_source']      ?? $_GET['utm_source']      ?? '';

/* ==== 2.1 Нормализация телефона (+E.164) ==== */
$DIAL_CODES = [
  'AL'=>'355','AT'=>'43','BA'=>'387','BE'=>'32','BG'=>'359','BY'=>'375','CH'=>'41','CY'=>'357','CZ'=>'420',
  'DE'=>'49','DK'=>'45','EE'=>'372','ES'=>'34','FI'=>'358','FR'=>'33','GB'=>'44','GR'=>'30','HR'=>'385',
  'HU'=>'36','IE'=>'353','IS'=>'354','IT'=>'39','LT'=>'370','LU'=>'352','LV'=>'371','MD'=>'373','ME'=>'382',
  'MK'=>'389','MT'=>'356','NL'=>'31','NO'=>'47','PL'=>'48','PT'=>'351','RO'=>'40','RS'=>'381','RU'=>'7',
  'SE'=>'46','SI'=>'386','SK'=>'421','UA'=>'380',
  'AE'=>'971','EG'=>'20','IL'=>'972','IQ'=>'964','IR'=>'98','JO'=>'962','KW'=>'965','LB'=>'961','MA'=>'212',
  'OM'=>'968','PS'=>'970','QA'=>'974','SA'=>'966','TN'=>'216','TR'=>'90',
  'AR'=>'54','BO'=>'591','BR'=>'55','CA'=>'1','CL'=>'56','CO'=>'57','CR'=>'506','DO'=>'1','EC'=>'593','GT'=>'502',
  'HN'=>'504','MX'=>'52','NI'=>'505','PA'=>'507','PE'=>'51','PR'=>'1','PY'=>'595','SV'=>'503','US'=>'1','UY'=>'598',
  'VE'=>'58',
  'AM'=>'374','AZ'=>'994','BD'=>'880','CN'=>'86','GE'=>'995','HK'=>'852','ID'=>'62','IN'=>'91','JP'=>'81',
  'KZ'=>'7','KG'=>'996','KH'=>'855','KR'=>'82','LA'=>'856','LK'=>'94','MM'=>'95','MN'=>'976','MY'=>'60',
  'NP'=>'977','PH'=>'63','PK'=>'92','SG'=>'65','TH'=>'66','TJ'=>'992','TM'=>'993','TW'=>'886','UZ'=>'998',
  'VN'=>'84',
  'CM'=>'237','GH'=>'233','KE'=>'254','NG'=>'234','ZA'=>'27',
  'AU'=>'61','NZ'=>'64'
];

$TRUNK_PREFIXES = [
  // Europe
  'AT'=>'0', 'BE'=>'0', 'BG'=>'0', 'BY'=>'0', 'CH'=>'0',
  'DE'=>'0', 'FI'=>'0', 'FR'=>'0', 'GB'=>'0', 'HR'=>'0',
  'HU'=>'06','IE'=>'0', 'LU'=>'0', 'MD'=>'0', 'ME'=>'0',
  'MK'=>'0', 'NL'=>'0', 'PL'=>'0', 'RO'=>'0', 'RS'=>'0',
  'RU'=>'8', 'SE'=>'0', 'SI'=>'0', 'SK'=>'0', 'TR'=>'0',
  'UA'=>'0',
  // Americas
  'AR'=>'0', 'BO'=>'0', 'BR'=>'0', 'EC'=>'0', 'GT'=>'0',
  'HN'=>'0', 'MX'=>'01','NI'=>'0', 'PE'=>'0', 'SV'=>'0',
  'VE'=>'0',
  // Asia / Pacific
  'AM'=>'0', 'AU'=>'0', 'AZ'=>'0', 'BD'=>'0', 'GE'=>'0',
  'ID'=>'0', 'IN'=>'0', 'KG'=>'0', 'KH'=>'0', 'KZ'=>'8',
  'LA'=>'0', 'LK'=>'0', 'MM'=>'0', 'MY'=>'0', 'NP'=>'0',
  'NZ'=>'0', 'PH'=>'0', 'PK'=>'0', 'TH'=>'0', 'TJ'=>'0',
  'TM'=>'0', 'TW'=>'0', 'UZ'=>'0', 'VN'=>'0',
  // MENA / Africa
  'CM'=>'0', 'EG'=>'0', 'GH'=>'0', 'IQ'=>'0', 'IR'=>'0',
  'JO'=>'0', 'KE'=>'0', 'LB'=>'0', 'MA'=>'0', 'NG'=>'0',
  'PS'=>'0', 'TN'=>'0', 'ZA'=>'0',
];

$NSN_LENGTHS = [
  // Europe [min, max]
  'AT'=>[4,13], 'BE'=>[8,9],  'BG'=>[8,9],  'BY'=>[9,9],  'CH'=>[9,9],
  'CY'=>[8,8],  'CZ'=>[9,9],  'DE'=>[3,12], 'DK'=>[8,8],  'EE'=>[7,8],
  'ES'=>[9,9],  'FI'=>[5,12], 'FR'=>[9,9],  'GB'=>[7,10], 'GR'=>[10,10],
  'HR'=>[8,9],  'HU'=>[9,9],  'IE'=>[7,9],  'IS'=>[7,9],  'IT'=>[6,11],
  'LT'=>[8,8],  'LU'=>[4,9],  'LV'=>[8,8],  'MD'=>[8,8],  'ME'=>[8,8],
  'MK'=>[8,8],  'MT'=>[8,8],  'NL'=>[9,9],  'NO'=>[8,8],  'PL'=>[9,9],
  'PT'=>[9,9],  'RO'=>[9,9],  'RS'=>[8,9],  'RU'=>[10,10],'SE'=>[6,10],
  'SI'=>[8,8],  'SK'=>[9,9],  'TR'=>[10,10],'UA'=>[9,9],
  // Americas
  'AR'=>[10,10],'BO'=>[8,8],  'BR'=>[10,11],'CA'=>[10,10],'CL'=>[9,9],
  'CO'=>[10,10],'CR'=>[8,8],  'DO'=>[10,10],'EC'=>[9,9],  'GT'=>[8,8],
  'HN'=>[8,8],  'MX'=>[10,10],'NI'=>[8,8],  'PA'=>[8,8],  'PE'=>[9,9],
  'PR'=>[10,10],'PY'=>[9,9],  'SV'=>[8,8],  'US'=>[10,10],'UY'=>[8,9],
  'VE'=>[10,10],
  // Asia / Pacific
  'AM'=>[8,8],  'AU'=>[5,9],  'AZ'=>[9,9],  'BD'=>[10,10],'CN'=>[11,11],
  'GE'=>[9,9],  'HK'=>[8,8],  'ID'=>[5,12], 'IN'=>[10,10],'JP'=>[10,11],
  'KG'=>[9,9],  'KH'=>[8,9],  'KR'=>[9,11], 'KZ'=>[10,10],'LA'=>[8,10],
  'LK'=>[9,9],  'MM'=>[8,10], 'MN'=>[8,8],  'MY'=>[9,10], 'NP'=>[9,10],
  'NZ'=>[8,10], 'PH'=>[10,10],'PK'=>[10,10],'SG'=>[8,8],  'TH'=>[9,9],
  'TJ'=>[9,9],  'TM'=>[8,8],  'TW'=>[9,9],  'UZ'=>[9,9],  'VN'=>[9,10],
  // MENA
  'AE'=>[9,9],  'EG'=>[10,10],'IL'=>[9,9],  'IQ'=>[10,10],'IR'=>[10,10],
  'JO'=>[9,9],  'KW'=>[8,8],  'LB'=>[7,8],  'MA'=>[9,9],  'OM'=>[8,8],
  'PS'=>[9,9],  'QA'=>[8,8],  'SA'=>[9,9],  'TN'=>[8,8],
  // Africa
  'CM'=>[9,9],  'GH'=>[9,9],  'KE'=>[9,9],  'NG'=>[10,10],'ZA'=>[9,9],
];

/* helper для 303-редиректа с ошибкой */
function redirectError(string $msg) {
  $ref = $_SERVER['HTTP_REFERER'] ?? '/';
  $sep = (strpos($ref, '?') === false ? '?' : '&');
  header("Location: {$ref}{$sep}api_error=" . urlencode($msg), true, 303);
  exit;
}

function normalize_phone(string $full, string $phone, string $country, array $DIAL_CODES, array $TRUNK_PREFIXES, array $NSN_LENGTHS): string {
  $full = trim($full);
  if ($full !== '') {
    $f = preg_replace('/\s+/', '', $full);
    if (stripos($f, 'tel:') === 0) $f = substr($f, 4);
    if (strpos($f, '00') === 0)   $f = '+' . substr($f, 2);
    if ($f === '') return '';
    if ($f[0] !== '+') $f = '+' . preg_replace('/\D+/', '', $f);
    return $f;
  }

  $raw = preg_replace('/\s+/', '', $phone);
  if ($raw !== '' && $raw[0] === '+') return '+' . preg_replace('/\D+/', '', $raw);
  if (strpos($raw, '00') === 0)      return '+' . preg_replace('/\D+/', '', substr($raw, 2));

  $cc     = $DIAL_CODES[$country] ?? '';
  $digits = preg_replace('/\D+/', '', $raw);

  if ($cc !== '' && strpos($digits, $cc) === 0) return '+' . $digits;

  $trunk = $TRUNK_PREFIXES[$country] ?? null;
  if ($trunk !== null && strpos($digits, $trunk) === 0) {
    $candidate    = substr($digits, strlen($trunk));
    $nsnRange     = $NSN_LENGTHS[$country] ?? null;
    $candidateLen = strlen($candidate);
    if ($nsnRange === null || ($candidateLen >= $nsnRange[0] && $candidateLen <= $nsnRange[1])) {
      if ($cc !== '') return '+' . $cc . $candidate;
    }
  }

  $KEEP_LEADING_ZERO_NSNS = [];
  if (!in_array($country, $KEEP_LEADING_ZERO_NSNS, true)) $digits = ltrim($digits, '0');

  if ($cc === '') return ($digits !== '') ? ('+' . $digits) : '';
  return '+' . $cc . $digits;
}

$phoneE164      = normalize_phone($full, $phone, $country, $DIAL_CODES, $TRUNK_PREFIXES, $NSN_LENGTHS);
$phoneDigitsKey = preg_replace('/\D+/', '', $phoneE164);

/* Sanity-check: per-country E.164 total-digit validation; global 8–15 as fallback. */
$phoneLen = strlen($phoneDigitsKey);
$ccLen    = strlen($DIAL_CODES[$country] ?? '');
$nsnRange = $NSN_LENGTHS[$country] ?? null;
if ($nsnRange !== null && $ccLen > 0) {
  if ($phoneLen < $ccLen + $nsnRange[0] || $phoneLen > $ccLen + $nsnRange[1]) redirectError('invalid_phone');
} elseif ($phoneLen < 8 || $phoneLen > 15) {
  redirectError('invalid_phone');
}

/* ==== 4) Глобальный антидубль через fixdoublecode + локальный fallback ==== */

if ($phoneDigitsKey !== '') {
  $dedupPayloadArr = [
    'phone'   => $phoneE164,    // нормализованный
    'geo'     => $country,
    'offer'   => $DEDUP_OFFER,
    'partner' => $DEDUP_PARTNER,
  ];
  $dedupPayload = json_encode($dedupPayloadArr, JSON_UNESCAPED_UNICODE);

  $ch = curl_init($DEDUP_ENDPOINT);
  curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $dedupPayload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 3,
    CURLOPT_CONNECTTIMEOUT => 1,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
  ]);
  $body = curl_exec($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $err  = curl_error($ch);
  curl_close($ch);

  $isDuplicate  = false;
  $usedFallback = false;
  $validApi     = false;

  if ($body !== false && $code >= 200 && $code < 300) {
    $data = json_decode($body, true);
    if (is_array($data) && array_key_exists('isNew', $data)) {
      $validApi    = true;
      $isDuplicate = !$data['isNew'];
    }
  }

  if (!$validApi) {
    // лог ошибки антидупла
    @file_put_contents(
      __DIR__ . '/dedup.error.log',
      sprintf(
        "[%s] http=%s err=%s body=%s payload=%s\n",
        date('Y-m-d H:i:s'),
        (string)$code,
        (string)$err,
        (string)$body,
        json_encode($dedupPayloadArr, JSON_UNESCAPED_UNICODE)
      ),
      FILE_APPEND
    );

    // локальный fallback-файл
    $dupFile = __DIR__ . '/dedup_phones.log';
    if ($fp = @fopen($dupFile, 'c+')) {
      $usedFallback = true;
      flock($fp, LOCK_EX);
      $seen = [];
      rewind($fp);
      while (($line = fgets($fp)) !== false) {
        $line = trim($line);
        if ($line !== '') {
          $seen[$line] = true;
        }
      }
      if (isset($seen[$phoneDigitsKey])) {
        $isDuplicate = true;
      } else {
        fseek($fp, 0, SEEK_END);
        fwrite($fp, $phoneDigitsKey . PHP_EOL);
        fflush($fp);
      }
      flock($fp, LOCK_UN);
      fclose($fp);
    }
  }

  if ($isDuplicate) {
    redirectError('duplicate_phone');
  }

  // лог нормальной работы антидупа
  @file_put_contents(
    __DIR__ . '/dedup.log',
    sprintf(
      "[%s] dup=%s src=%s body=%s\n",
      date('Y-m-d H:i:s'),
      $isDuplicate ? '1' : '0',
      $usedFallback ? 'fallback' : 'api',
      (string)$body
    ),
    FILE_APPEND
  );
}

/* ==== 5) Служебная инфа ==== */
$ip = $_SERVER['HTTP_CF_CONNECTING_IP']
   ?? $_SERVER['HTTP_X_FORWARDED_FOR']
   ?? $_SERVER['REMOTE_ADDR']
   ?? '';
$ip = trim(explode(',', $ip)[0]);
$fbc = $_COOKIE['_fbc'] ?? null;
$fbp = $_COOKIE['_fbp'] ?? null;
$ua  = $_SERVER['HTTP_USER_AGENT'] ?? '';

/* ==== 6) Payload для M1 ==== */
$order = [
  'ref'        => $REF,
  'api_key'    => $AD_API_KEY,
  'product_id' => $PRODUCT_ID,
  'name'       => $name,
  'langCode'   => $country,
  'phone'      => $phoneE164,
  'ip'         => $ip,
  's'          => $clickId ?: null,
];
$order = array_filter($order, static fn($v) => !($v === null || $v === ''));

/* ==== 7) Логи запроса ==== */
@file_put_contents(
  __DIR__ . '/m1.request.log',
  sprintf("[%s] %s\n", date('Y-m-d H:i:s'), json_encode($order, JSON_UNESCAPED_UNICODE)),
  FILE_APPEND
);

/* ==== 8) Немедленный редирект → фоновая обработка ==== */
ignore_user_abort(true);
set_time_limit(120);

$tyParams = http_build_query([
  'name'       => $name,
  'phone'      => $phoneE164,
  'pixel'      => $pixel,
  'country'    => $country,
  'subid'      => $clickId,
  'utm_source' => $utmSource,
  'clickid'    => $clickId,
]);

session_write_close();
header('X-Accel-Buffering: no');
header('Location: ty/index.php?' . $tyParams, true, 303);
header('Connection: close');
header('Content-Length: 0');
if (ob_get_level() > 0) ob_end_flush();
flush();
if (function_exists('fastcgi_finish_request')) {
  fastcgi_finish_request();
}

/* ==== 9) Отправка в M1 (фон) ==== */
$ch = curl_init($AD_API_URL);
curl_setopt_array($ch, [
  CURLOPT_POST           => true,
  CURLOPT_POSTFIELDS     => http_build_query($order),
  CURLOPT_HTTPHEADER     => ['Content-Type: application/x-www-form-urlencoded'],
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT        => 30,
  CURLOPT_USERAGENT      => $ua ?: ('curl/' . (curl_version()['version'] ?? '')),
]);
$body = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err  = curl_error($ch);
curl_close($ch);

/* ==== 10) Логи ответа ==== */
@file_put_contents(
  __DIR__ . '/m1.response.log',
  sprintf("[%s] HTTP %s RESP: %s\n", date('Y-m-d H:i:s'), (string)$code, ($body ?: $err)),
  FILE_APPEND
);

/* ==== 11) Facebook CAPI (фон, опционально) ==== */
$capiToken = $fbToken ?: $FB_CAPI_TOKEN;
if (!empty($pixel) && !empty($capiToken) && preg_match('/^\d+$/', $pixel)) {
  $phoneForHash = preg_replace('/\D+/', '', $phoneE164);
  $userData = array_filter([
    'ph'                => [hash('sha256', $phoneForHash)],
    'client_ip_address' => $ip,
    'client_user_agent' => $ua,
    'fbc'               => $fbc,
    'fbp'               => $fbp,
  ]);
  $capiPayload = [
    'data' => [[
      'event_name'       => 'Lead',
      'event_time'       => time(),
      'event_id'         => $clickId ?: uniqid('ev_', true),
      'event_source_url' => 'https://' . ($_SERVER['HTTP_HOST'] ?? '') . '/',
      'action_source'    => 'website',
      'user_data'        => $userData,
    ]],
    'access_token' => $capiToken,
  ];
  $capiCh = curl_init('https://graph.facebook.com/v19.0/' . $pixel . '/events');
  curl_setopt_array($capiCh, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($capiPayload, JSON_UNESCAPED_UNICODE),
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 5,
    CURLOPT_CONNECTTIMEOUT => 2,
    CURLOPT_SSL_VERIFYHOST => 0,
    CURLOPT_SSL_VERIFYPEER => 0,
  ]);
  $capiResp = curl_exec($capiCh);
  $capiCode = curl_getinfo($capiCh, CURLINFO_HTTP_CODE);
  curl_close($capiCh);

  $capiOk = ($capiResp !== false && $capiCode >= 200 && $capiCode < 300);

  @file_put_contents(
    __DIR__ . '/capi.log',
    sprintf("[%s] pixel=%s http=%s ok=%d resp=%s\n",
      date('Y-m-d H:i:s'), $pixel, $capiCode, (int)$capiOk, $capiResp),
    FILE_APPEND
  );

  /* --- Алерт при протухшем/невалидном токене --- */
  if (!$capiOk) {
    $alertFile = __DIR__ . '/capi_token_alert.flag';
    $now = time();
    $shouldAlert = true;
    if (file_exists($alertFile)) {
      $lastAlert = (int)@file_get_contents($alertFile);
      if (($now - $lastAlert) < 3600) $shouldAlert = false;
    }
    if ($shouldAlert) {
      @file_put_contents($alertFile, (string)$now);
      @file_put_contents(
        __DIR__ . '/capi_errors.log',
        sprintf("[%s] TOKEN PROBLEM! pixel=%s http=%s resp=%s\n",
          date('Y-m-d H:i:s'), $pixel, $capiCode, $capiResp),
        FILE_APPEND
      );
    }
  }
}
