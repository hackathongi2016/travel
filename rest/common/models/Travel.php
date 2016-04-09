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
            $topic = new GroupLesson();
            $topic->group_id = $this->tra_id;

            if (!$topic->save()) {
                throw new Exception('Transaction failed: GroupLesson', $groupLesson->getErrors());
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
