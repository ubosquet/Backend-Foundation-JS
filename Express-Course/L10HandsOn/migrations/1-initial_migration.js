'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "posts", deps: []
 * createTable "users", deps: []
 * createTable "post_user", deps: [users, posts]
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2019-08-01T03:08:10.040Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "posts",
            {
                "PostId": {
                    "type": Sequelize.INTEGER,
                    "field": "PostId",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "PostTitle": {
                    "type": Sequelize.STRING,
                    "field": "PostTitle"
                },
                "PostBody": {
                    "type": Sequelize.STRING,
                    "field": "PostBody"
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId"
                },
                "Deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Deleted",
                    "defaultValue": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "users",
            {
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "FirstName": {
                    "type": Sequelize.STRING,
                    "field": "FirstName"
                },
                "LastName": {
                    "type": Sequelize.STRING,
                    "field": "LastName"
                },
                "Username": {
                    "type": Sequelize.STRING,
                    "field": "Username",
                    "unique": true
                },
                "Password": {
                    "type": Sequelize.STRING,
                    "field": "Password"
                },
                "Email": {
                    "type": Sequelize.STRING,
                    "field": "Email",
                    "unique": true
                },
                "Admin": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Admin",
                    "defaultValue": false
                },
                "Deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Deleted",
                    "defaultValue": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "post_user",
            {
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "users",
                        "key": "UserId"
                    },
                    "primaryKey": true
                },
                "postPostId": {
                    "type": Sequelize.INTEGER,
                    "field": "postPostId",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "posts",
                        "key": "PostId"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
