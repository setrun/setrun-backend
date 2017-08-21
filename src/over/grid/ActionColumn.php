<?php

/**
 * @author Denis Utkin <dizirator@gmail.com>
 * @link   https://github.com/dizirator
 */

namespace setrun\backend\over\grid;

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
    public $template = '{edit} {view} {delete}';

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
                    'class'     => 'btn btn-xs btn-default',
                    'data-pjax' => 0
                ], $this->buttonOptions);
                return Html::a('<i class="fa fa-circle-o"></i>', $url, $options);
            };
        }
        if (!isset($this->buttons['edit'])) {
            $this->buttons['edit'] = function ($url, $model, $key) {
                $options = ArrayHelper::merge([
                    'class'     => 'btn btn-xs btn-default',
                    'data-pjax' => 0
                ], $this->buttonOptions);
                return Html::a('<i class="fa fa-pencil"></i>', $url, $options);
            };
        }
        if (!isset($this->buttons['delete'])) {
            $this->buttons['delete'] = function ($url, $model, $key) {
                $options = ArrayHelper::merge([
                    'class' => 'btn btn-xs btn-default ajax-delete-item',
                    'data-confirm-message' => Yii::t('setrun/backend', 'Do you want to delete ?'),
                    'data-grid-view' => 1,
                    'data-pjax' => 0
                ], $this->buttonOptions);
                return Html::a('<i class="fa fa-trash"></i>', $url, $options);
            };
        }
    }
}