<?php
namespace api\modules\v1;

/**
 * Model
 *
 * @author Pere Garriga <pgarriga@ingeniummobile.com>
 */
class Module extends \yii\base\Module
{
    public $controllerNamespace = 'api\modules\v1\controllers';

    public function init()
    {
        parent::init();
        \Yii::$app->user->identityClass = 'api\modules\v1\models\User';
    }
}