<?php

namespace common\models;

use Yii;
use \common\models\base\User as BaseUser;

/**
 * This is the model class for table "User".
 */
class User extends BaseUser
{
    public function extraFields() {
        $fields = parent::extraFields();
        $fields[] = 'travels';
        return $fields;
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTravels()
    {
        return $this->hasMany(\common\models\Travel::className(), ['tra_id' => 'ust_tra_id'])->via('userTravels');
    }
}
