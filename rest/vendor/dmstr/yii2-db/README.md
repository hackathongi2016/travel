Yii 2 Database Toolkit
======================

Database extensions

Installation
------------

The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
php composer.phar require --prefer-dist dmstr/yii2-db "*"
```

or add

```
"dmstr/yii2-db": "*"
```

to the require section of your `composer.json` file.


Contents
--------

### [dmstr\db\behaviors\HydratedAttributes](https://github.com/dmstr/yii2-db/blob/master/db/behaviors/HydratedAttributes.php)

retrieve all eager loaded attributes of a model including relations

### [dmstr\db\mysql\FileMigration](https://github.com/dmstr/yii2-db/blob/master/db/mysql/FileMigration.php)

runs database migrations from `sql` files

Create a file migration class

```
./yii migrate/create \
    --templateFile='@vendor/dmstr/yii2-db/mysql/templates/file-migration.php' init_dump
```

### dmstr\console\controllers\MysqlControllers
  
```
DESCRIPTION

MySQL database maintenance command.


SUB-COMMANDS

- db/create           Create MySQL database from ENV vars and grant permissions
- db/dump             Dumps current database tables to runtime folder
- db/index (default)  Displays tables in database
```
  

Usage
-----

Once the extension is installed, simply use it in your code by accessing the corresponding classes by their full namespaced path.

Examples
-------
tbd
