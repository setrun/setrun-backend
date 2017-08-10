<?php

/**
 * @author Denis Utkin <dizirator@gmail.com>
 * @link   https://github.com/dizirator
 */

namespace setrun\backend\controllers;

use setrun\sys\components\controllers\BackController;

class BackendController extends BackController
{
    public function actionIndex()
    {
        return $this->render('index');
    }
}