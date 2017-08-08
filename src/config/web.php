<?php

/**
 * @author Denis Utkin <dizirator@gmail.com>
 * @link   https://github.com/dizirator
 */

use setrun\sys\helpers\ArrayHelper;

if (isset($baseConfig)) {
    $backendSlug = ArrayHelper::get($baseConfig, 'params.backendSlug', 'adm');
} else {
    $backendSlug = 'adm';
}
return [
    'components' => [
        'urlManager' => [
            'rules' => [
                "{$backendSlug}" => "backend/backend/index",
                "{$backendSlug}/<_m:\w+>/<_c:\w+(-\w+)*>" => "<_m>/backend/<_c>/index",
                "{$backendSlug}/<_m:\w+>/<_c:[-\w]+>/<_a:[-\w]+>/<id:\d+>" => "<_m>/backend/<_c>/<_a>",
                "{$backendSlug}/<_m:\w+>/<_c:[-\w]+>/<_a:[-\w]+>" => "<_m>/backend/<_c>/<_a>"
            ]
        ]
    ]
];