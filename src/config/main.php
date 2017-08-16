<?php

/**
 * @author Denis Utkin <dizirator@gmail.com>
 * @link   https://github.com/dizirator
 */


return [
    'components' => [
        'i18n' => [
            'translations' => [
                'setrun/backend' => [
                    'class'    => 'yii\i18n\PhpMessageSource',
                    'basePath' => '@setrun/backend/messages',
                    'fileMap' => [
                        'setrun/backend' => 'backend.php',

                    ]
                ]
            ]
        ],
    ],
    'modules' => [
        'backend' => 'setrun\backend\Module'
    ]
];