<?php

/**
 * @author Denis Utkin <dizirator@gmail.com>
 * @link   https://github.com/dizirator
 */

namespace setrun\backend\assets;

use setrun\sys\over\web\AssetBundle;

/**
 * Class BackendAsset.
 */
class BackendAsset extends  AssetBundle
{
    /**
     * @inheritdoc
     */
    public $sourcePath = '@setrun/backend/assets/dist';

    /**
     * @inheritdoc
     */
    public $js = [
        'js/helpers.js',
        'js/backend.js'
    ];

    /**
     * @inheritdoc
     */
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapPluginAsset',
        'setrun\sys\assets\SysAsset',
        'setrun\sys\assets\NotyAsset'
    ];
}