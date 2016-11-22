# AEB1011 Exercises - ionic sqlite
This branch contains a contacts app using [ionicmaterial](http://ionicmaterial.com/) and the [ionic framework](http://ionicframework.com/). Storage is implemented using [ngCordova](http://ngcordova.com/) plugin and [$cordovaSQLite](http://ngcordova.com/docs/plugins/sqlite/) provider.

# Getting started
In order to work with this branch and start building your app you must first install and configure the following development tools.

* Java JDK
* Apache Ant
* Git
* Nodejs
* Apache cordova
* Android SDK
* Console
* ionic framework

Please refer to the [wiki](https://github.com/haxdai/AEB1011Exercises/wiki/Development-Tools) for information on how to install the required tools for your OS.

## App structure
A default contacts app is preconfigured with the following folder structure:

````bash
├── bower.json        //bower dependencies
├── config.xml        //Cordova configuration file
├── gulpfile.js       //Gulp tasks
├── ionic.config.json // ionic configuration
├── package.json      // node dependencies
├── README.md         //This file
├── hooks/            // custom cordova hooks to execute on specific commands
├── scss/             // scss code, which will output to www/css/
└── www/              // application - JS code and libs, CSS, images, etc.
````

### Add target platforms

To add iOS target platform (you must be using Mac OS X and have XCode installed)
````sh
ionic platform add ios
````

When built, an app called contacts.app is generated in /platforms/ios/build

To add Android target platform
````sh
ionic platform add android
````

When built, an apk called _android-debug.apk_ is generated in /platforms/android/build/outputs/apk/

### Building the app

To install app dependencies

````sh
npm install
bower install
````

To build the iOs app package

````sh
ionic build ios
````

To build the Android app package

````sh
ionic build android
````

## Testing the app
In order to test the app you will need to add target platforms, generate the distribution packages and emulate or install those packages in the target platform.

### Test the app locally

You can use ionic serve to launch a web server and test your app in the browser (Chrome browser is recommended for android development).

Just run the following command in the command line prompt.

````sh
ionic serve
````

Ionic server will launch and the browser will open showing the main page of your app.

### Test the app using emulators

To use an android emulator you must have android sdk installed, and the corresponding environment variables for android build-tools, platform-tools and sdk defined. Additionally an emulator image must exist. You can look for android sdk manager and android avd manager documentation.

To emulate the Android app run the following command in the command line prompt.

````sh
ionic emulate android
````

If you will use the iOS emulator (Mac Only), you must have XCode installed on your OS. To emulate the iOs app run the following command in the command line prompt..

````sh
ionic emulate iOs
````

### Test the app using a device

To test your app using a real device, you must have correctly installed the corresponding drivers in your OS (refer to device vendor to get more information). First, connect your device to your computer and run the following command in command line prompt.

````sh
ionic run <platform>
````

Where <code>&lt;platform&gt;</code> must be **android** or **ios**.

Chrome uses can debug the app using chrome web inspector at chrome://inspect/#devices.
