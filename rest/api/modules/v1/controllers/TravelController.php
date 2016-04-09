<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace api\modules\v1\controllers;

use Yii;
use yii\base\InvalidConfigException;
use yii\base\Model;
use yii\web\ForbiddenHttpException;
use yii\rest\ActiveController;

/**
 * ActiveController implements a common set of actions for supporting RESTful access to ActiveRecord.
 *
 * The class of the ActiveRecord should be specified via [[modelClass]], which must implement [[\yii\db\ActiveRecordInterface]].
 * By default, the following actions are supported:
 *
 * - `index`: list of models
 * - `view`: return the details of a model
 * - `create`: create a new model
 * - `update`: update an existing model
 * - `delete`: delete an existing model
 * - `options`: return the allowed HTTP methods
 *
 * You may disable some of these actions by overriding [[actions()]] and unsetting the corresponding actions.
 *
 * To add a new action, either override [[actions()]] by appending a new action class or write a new action method.
 * Make sure you also override [[verbs()]] to properly declare what HTTP methods are allowed by the new action.
 *
 * You should usually override [[checkAccess()]] to check whether the current user has the privilege to perform
 * the specified action against the specified model.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class TravelController extends ActiveController
{
    /**
     * @var string the model class name. This property must be set.
     */
    public $modelClass = "common\models\Travel";

    public function actions() {
        return [
            'index' => [
                'class' => 'yii\rest\IndexAction',
                'modelClass' => $this->modelClass,
                'checkAccess' => [$this, 'checkAccess'],
            ],
            'view' => [
                'class' => 'yii\rest\ViewAction',
                'modelClass' => $this->modelClass,
                'checkAccess' => [$this, 'checkAccess'],
            ],
            'create' => [
                'class' => 'api\modules\v1\rest\Topic\CreateAction',
                'modelClass' => $this->modelClass,
                'checkAccess' => [$this, 'checkAccess'],
                'scenario' => $this->createScenario,
            ],
            'update' => [
                'class' => 'api\modules\v1\rest\Topic\UpdateAction',
                'checkAccess' => [$this, 'checkAccess'],
                'scenario' => $this->updateScenario,
            ],
            'delete' => [
                'class' => 'yii\rest\DeleteAction',
                'modelClass' => $this->modelClass,
                'checkAccess' => [$this, 'checkAccess'],
            ],
            'travel-topics' => [
                'class' => 'api\modules\v1\rest\Topic\GetTravelTopics',
                'modelClass' => $this->modelClass,
                'checkAccess' => [$this, 'checkAccess'],
                'scenario' => $this->updateScenario,
            ],
            'options' => [
                'class' => 'yii\rest\OptionsAction',
            ],
        ];
    }

    public function behaviors()
    {
        return [

        ];
    }

    public function actionPreflight() {
        return;
    }

    /**
     * Checks the privilege of the current user.
     *
     * This method should be overridden to check whether the current user has the privilege
     * to run the specified action against the specified data model.
     * If the user does not have access, a [[ForbiddenHttpException]] should be thrown.
     *
     * @param string $action the ID of the action to be executed
     * @param object $model the model to be accessed. If null, it means no specific model is being accessed.
     * @param array $params additional parameters
     * @throws ForbiddenHttpException if the user does not have access
     */
    public function checkAccess($action, $model = null, $params = [])
    {
    }
}

namespace api\modules\v1\rest\Topic;

use Yii;
use yii\base\InvalidConfigException;
use yii\base\Model;
use yii\web\ForbiddenHttpException;
use yii\rest\ActiveController;
use yii\rest\Action;
use common\models\Travel;

class UpdateAction extends Action {

    /**
     * @var string the scenario to be assigned to the model before it is validated and updated.
     */
    public $scenario = Model::SCENARIO_DEFAULT;

    /**
     * Updates an existing model.
     * @param string $id the primary key of the model.
     * @return \yii\db\ActiveRecordInterface the model being updated
     * @throws Exception if there is any error when updating the model
     */
    public function run($id) {
        /* @var $model ActiveRecord */
        $model = $this->findModel($id);

        $model->scenario = $this->scenario;

        $transaction = Yii::$app->db->beginTransaction();
        try {
            $params = Yii::$app->getRequest()->getBodyParams();
            $model->load($params, '');

            if (!$model->save()) {
                throw new Exception('Transaction failed: Group', $model->getErrors());
            } else {
                $model->manageTopics($params["topics"]);
            }

            $transaction->commit();
        } catch (Exception $ex) {
            $transaction->rollback();
            throw $ex;
        }

        return $model;
    }

}

namespace api\modules\v1\rest\Topic;

use Yii;
use yii\base\InvalidConfigException;
use yii\base\Model;
use yii\web\ForbiddenHttpException;
use yii\rest\ActiveController;
use yii\rest\Action;
use common\models\Travel;

class CreateAction extends Action {

    /**
     * @var string the scenario to be assigned to the model before it is validated and updated.
     */
    public $scenario = Model::SCENARIO_DEFAULT;

    /**
     * Updates an existing model.
     * @param string $id the primary key of the model.
     * @return \yii\db\ActiveRecordInterface the model being updated
     * @throws Exception if there is any error when updating the model
     */
    public function run() {
        /* @var $model ActiveRecord */
        $model = new Travel();
        $model->scenario = $this->scenario;

        $transaction = Yii::$app->db->beginTransaction();
        try {
            $params = Yii::$app->getRequest()->getBodyParams();
            $model->load($params, '');

            if (!$model->save()) {
                throw new Exception('Transaction failed: Group', $model->getErrors());
            } else {
                $model->manageTopics($params["topics"]);
            }

            $transaction->commit();
        } catch (Exception $ex) {
            $transaction->rollback();
            throw $ex;
        }

        return $model;
    }

}
