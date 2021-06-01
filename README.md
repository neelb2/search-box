# SEARCH BOX

# Setup
1. Install Node.js `>= v9.4.0` via [nvm]
2. Install [react-native-cli] globally —
   ```bash
   $ npm i -g react-native-cli
   ```
3. Clone the project and run `npm install` —
    ```bash
    $ npm install
    ```
4. Set-up Emulator
   1. For Android
      1. Install JDK v8
      2. Run the following command
       ```bash
        $ npm run:android:emulator
       ```
   2. For IOS
      Install Xcode `>= 8`

5. Run application
   1. For Android , Pre run emulator for Android Studio or Command Above
      ```bash
        $ npm run-android
      ```
   2. For IOS
      ```bash
        $ cd ios/ 
        $ pod repo update
        $ pod install
        $ cd ..
        $ npm run-ios
      ```
6. Build issues
   1. For Android
       ```text
        Android Studio / Build / Clean Project
       ```
   2. For IOS
        ```bash
         $ sudo xcode-select --switch /Applications/Xcode.app
         $ pod repo update
         $ pod install        
        ```
