<?php

namespace common\models;

use Yii;
use \common\models\base\Topic as BaseTopic;

/**
 * This is the model class for table "Topic".
 */
class Topic extends BaseTopic
{
	public function fields() {
        $fields = array_merge(parent::fields(), ['topicProposals']);

        return $fields;
    }

    /*
	public function extraFields() {
        $fields = parent::extraFields();
        $fields[] = 'TopicProposals';
        return $fields;
    }
    */
}
