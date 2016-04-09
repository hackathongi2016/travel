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

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUsers()
    {
        return $this->hasMany(\common\models\User::className(), ['id' => 'usr_id'])->via('userTravels');
    }

}
