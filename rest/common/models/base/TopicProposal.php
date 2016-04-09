<?php
// This class was automatically generated by a giiant build task
// You should not change it manually as it will be overwritten on next build

namespace common\models\base;

use Yii;

/**
 * This is the base-model class for table "TopicProposal".
 *
 * @property integer $pro_id
 * @property string $pro_title
 * @property string $pro_description
 * @property integer $pro_top_id
 * @property integer $pro_usr_id
 *
 * @property \common\models\Topic $proTop
 * @property \common\models\User $proUsr
 * @property \common\models\Vote[] $votes
 * @property string $aliasModel
 */
abstract class TopicProposal extends \yii\db\ActiveRecord
{



    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'TopicProposal';
    }

    /**
     * Alias name of table for crud viewsLists all Area models.
     * Change the alias name manual if needed later
     * @return string
     */
    public function getAliasModel($plural=false)
    {
        if($plural){
            return Yii::t('app', 'TopicProposals');
        }else{
            return Yii::t('app', 'TopicProposal');
        }
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['pro_title', 'pro_top_id', 'pro_usr_id'], 'required'],
            [['pro_top_id', 'pro_usr_id'], 'integer'],
            [['pro_title'], 'string', 'max' => 1000],
            [['pro_description'], 'string', 'max' => 4000],
            [['pro_top_id'], 'exist', 'skipOnError' => true, 'targetClass' => Topic::className(), 'targetAttribute' => ['pro_top_id' => 'top_id']],
            [['pro_usr_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['pro_usr_id' => 'usr_id']]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'pro_id' => 'Pro ID',
            'pro_title' => 'Pro Title',
            'pro_description' => 'Pro Description',
            'pro_top_id' => 'Pro Top ID',
            'pro_usr_id' => 'Pro Usr ID',
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
            'pro_id' => 'Pro Id',
            'pro_title' => 'Pro Title',
            'pro_description' => 'Pro Description',
            'pro_top_id' => 'Pro Top Id',
            'pro_usr_id' => 'Pro Usr Id',
            ]);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getProTop()
    {
        return $this->hasOne(\common\models\Topic::className(), ['top_id' => 'pro_top_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getProUsr()
    {
        return $this->hasOne(\common\models\User::className(), ['usr_id' => 'pro_usr_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getVotes()
    {
        return $this->hasMany(\common\models\Vote::className(), ['vot_pro_id' => 'pro_id']);
    }




}
