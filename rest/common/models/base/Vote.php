<?php
// This class was automatically generated by a giiant build task
// You should not change it manually as it will be overwritten on next build

namespace common\models\base;

use Yii;

/**
 * This is the base-model class for table "Vote".
 *
 * @property integer $vot_id
 * @property integer $vot_usr_id
 * @property integer $vot_pro_id
 *
 * @property \common\models\TopicProposal $votPro
 * @property \common\models\User $votUsr
 * @property string $aliasModel
 */
abstract class Vote extends \yii\db\ActiveRecord
{



    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'Vote';
    }

    /**
     * Alias name of table for crud viewsLists all Area models.
     * Change the alias name manual if needed later
     * @return string
     */
    public function getAliasModel($plural=false)
    {
        if($plural){
            return Yii::t('app', 'Votes');
        }else{
            return Yii::t('app', 'Vote');
        }
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['vot_usr_id', 'vot_pro_id'], 'required'],
            [['vot_usr_id', 'vot_pro_id'], 'integer'],
            [['vot_pro_id'], 'exist', 'skipOnError' => true, 'targetClass' => TopicProposal::className(), 'targetAttribute' => ['vot_pro_id' => 'pro_id']],
            [['vot_usr_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['vot_usr_id' => 'usr_id']]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'vot_id' => 'Vot ID',
            'vot_usr_id' => 'Vot Usr ID',
            'vot_pro_id' => 'Vot Pro ID',
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
            'vot_id' => 'Vot Id',
            'vot_usr_id' => 'Vot Usr Id',
            'vot_pro_id' => 'Vot Pro Id',
            ]);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getVotPro()
    {
        return $this->hasOne(\common\models\TopicProposal::className(), ['pro_id' => 'vot_pro_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getVotUsr()
    {
        return $this->hasOne(\common\models\User::className(), ['usr_id' => 'vot_usr_id']);
    }




}
