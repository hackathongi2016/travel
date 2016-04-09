<?php

namespace common\models;

use Yii;
use \common\models\base\Travel as BaseTravel;

/**
 * This is the model class for table "Travel".
 */
class Travel extends BaseTravel
{
	public function extraFields() {
        $fields = parent::extraFields();
        $fields[] = 'topics';
        $fields[] = 'users';
        return $fields;
    }

    public function manageTopics($topicsData) {

        foreach ($topicsData as $topicData) {

            // Create Case
            $topic = new \common\models\Topic();

            $topic->top_tra_id = $this->tra_id;
            $topic->top_name = $topicData["text"];

            if (!$topic->save()) {
            	var_dump($topic->getErrors());
            }
        }
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUsers()
    {
        return $this->hasMany(\common\models\User::className(), ['usr_id' => 'ust_usr_id'])->via('userTravels');
    }

}
