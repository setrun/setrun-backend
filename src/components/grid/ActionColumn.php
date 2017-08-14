<?php

/**
 * @author Denis Utkin <dizirator@gmail.com>
 * @link   https://github.com/dizirator
 */

namespace setrun\backend\components\grid;

use Yii;
use yii\helpers\Html;
use setrun\sys\helpers\ArrayHelper;

/**
 * ActionColumn is a column for the [[GridView]] widget that displays buttons for viewing and manipulating the items.
 */
class ActionColumn extends \yii\grid\ActionColumn
{
    /**
     * @inheritdoc
     */
    public $template = '{update} {view} {delete}';

    /**
     * @inheritdoc
     */
    public $contentOptions = ['style' => 'text-align:center'];
    /**
     * @inheritdoc
     */
    protected function initDefaultButtons()
    {
        if (!isset($this->buttons['view'])) {
            $this->buttons['view'] = function ($url, $model, $key) {
                $options = ArrayHelper::merge([
                    'class'     => 'btn btn-default',
                    'data-pjax' => 0
                ], $this->buttonOptions);
                return Html::a('<span class="glyphicon glyphicon-eye-open"></span>', $url, $options);
            };
        }
        if (!isset($this->buttons['update'])) {
            $this->buttons['update'] = function ($url, $model, $key) {
                $options = ArrayHelper::merge([
                    'class'     => 'btn btn-default',
                    'data-pjax' => 0
                ], $this->buttonOptions);
                return Html::a('<span class="glyphicon glyphicon-pencil"></span>', $url, $options);
            };
        }
        if (!isset($this->buttons['delete'])) {
            $this->buttons['delete'] = function ($url, $model, $key) {
                $options = ArrayHelper::merge([
                    'class'        => 'btn btn-default',
                    'data-confirm' => Yii::t('setrun/backend', 'Do you want to delete ?'),
                    'data-method'  => 'post',
                    'data-pjax'    => 0
                ], $this->buttonOptions);
                return Html::a('<span class="glyphicon glyphicon-trash"></span>', $url, $options);
            };
        }
    }
}