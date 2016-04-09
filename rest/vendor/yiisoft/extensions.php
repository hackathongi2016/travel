<?php

$vendorDir = dirname(__DIR__);

return array (
  'yiisoft/yii2-swiftmailer' => 
  array (
    'name' => 'yiisoft/yii2-swiftmailer',
    'version' => '2.0.5.0',
    'alias' => 
    array (
      '@yii/swiftmailer' => $vendorDir . '/yiisoft/yii2-swiftmailer',
    ),
  ),
  'yiisoft/yii2-codeception' => 
  array (
    'name' => 'yiisoft/yii2-codeception',
    'version' => '2.0.5.0',
    'alias' => 
    array (
      '@yii/codeception' => $vendorDir . '/yiisoft/yii2-codeception',
    ),
  ),
  'yiisoft/yii2-bootstrap' => 
  array (
    'name' => 'yiisoft/yii2-bootstrap',
    'version' => '2.0.6.0',
    'alias' => 
    array (
      '@yii/bootstrap' => $vendorDir . '/yiisoft/yii2-bootstrap',
    ),
  ),
  'yiisoft/yii2-debug' => 
  array (
    'name' => 'yiisoft/yii2-debug',
    'version' => '2.0.6.0',
    'alias' => 
    array (
      '@yii/debug' => $vendorDir . '/yiisoft/yii2-debug',
    ),
  ),
  'yiisoft/yii2-gii' => 
  array (
    'name' => 'yiisoft/yii2-gii',
    'version' => '2.0.5.0',
    'alias' => 
    array (
      '@yii/gii' => $vendorDir . '/yiisoft/yii2-gii',
    ),
  ),
  'yiisoft/yii2-faker' => 
  array (
    'name' => 'yiisoft/yii2-faker',
    'version' => '2.0.3.0',
    'alias' => 
    array (
      '@yii/faker' => $vendorDir . '/yiisoft/yii2-faker',
    ),
  ),
  'dmstr/yii2-db' => 
  array (
    'name' => 'dmstr/yii2-db',
    'version' => '0.3.0.0',
    'alias' => 
    array (
      '@dmstr/db' => $vendorDir . '/dmstr/yii2-db/db',
      '@dmstr/console' => $vendorDir . '/dmstr/yii2-db/console',
    ),
  ),
  'dmstr/yii2-helpers' => 
  array (
    'name' => 'dmstr/yii2-helpers',
    'version' => '0.3.0.0',
    'alias' => 
    array (
      '@dmstr/helpers' => $vendorDir . '/dmstr/yii2-helpers/src',
    ),
  ),
  'dmstr/yii2-bootstrap' => 
  array (
    'name' => 'dmstr/yii2-bootstrap',
    'version' => '0.1.1.0',
    'alias' => 
    array (
      '@dmstr/bootstrap' => $vendorDir . '/dmstr/yii2-bootstrap',
    ),
  ),
  'schmunk42/yii2-giiant' => 
  array (
    'name' => 'schmunk42/yii2-giiant',
    'version' => '0.7.1.0',
    'alias' => 
    array (
      '@schmunk42/giiant' => $vendorDir . '/schmunk42/yii2-giiant/src',
    ),
    'bootstrap' => 'schmunk42\\giiant\\Bootstrap',
  ),
);
