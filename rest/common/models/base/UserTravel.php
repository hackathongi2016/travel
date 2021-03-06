<?php
// This class was automatically generated by a giiant build task
// You should not change it manually as it will be overwritten on next build

namespace common\models\base;

use Yii;

/**
 * This is the base-model class for table "UserTravel".
 *
 * @property integer $ust_id
 * @property integer $ust_usr_id
 * @property integer $ust_tra_id
 *
 * @property \common\models\Travel $ustTra
 * @property \common\models\User $ustUsr
 * @property string $aliasModel
 */
abstract class UserTravel extends \yii\db\ActiveRecord
{



    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'UserTravel';
    }

    /**
     * Alias name of table for crud viewsLists all Area models.
     * Change the alias name manual if needed later
     * @return string
     */
    public function getAliasModel($plural=false)
    {
        if($plural){
            return Yii::t('app', 'UserTravels');
        }else{
            return Yii::t('app', 'UserTravel');
        }
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['ust_usr_id', 'ust_tra_id'], 'required'],
            [['ust_usr_id', 'ust_tra_id'], 'integer'],
            [['ust_tra_id'], 'exist', 'skipOnError' => true, 'targetClass' => Travel::className(), 'targetAttribute' => ['ust_tra_id' => 'tra_id']],
            [['ust_usr_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['ust_usr_id' => 'usr_id']]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'ust_id' => 'Ust ID',
            'ust_usr_id' => 'Ust Usr ID',
            'ust_tra_id' => 'Ust Tra ID',
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeHints()
    {
        return array_merge(
            parent::attributeHints(),
            [
            'ust_id' => 'Ust Id',
            'ust_usr_id' => 'Ust Usr Id',
            'ust_tra_id' => 'Ust Tra Id',
            ]);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUstTra()
    {
        return $this->hasOne(\common\models\Travel::className(), ['tra_id' => 'ust_tra_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUstUsr()
    {
        return $this->hasOne(\common\models\User::className(), ['usr_id' => 'ust_usr_id']);
    }




}
