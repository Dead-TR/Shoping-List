# Shop List App (Firebase)

npm v16

# Build

- generate keystore
```bash
keytool -genkey -v -keystore your_key_name.keystore -alias your_key_alias -keyalg RSA -keysize 2048 -validity 10000
```

- move keystore
```bash
mv my-release-key.keystore /android/app
```

- change android\app\build.gradle
```js
signingConfigs {
  release {
    storeFile file('your_key_name.keystore')
    storePassword 'your_key_store_password' // change password here
    keyAlias 'your_key_alias'
    keyPassword 'your_key_file_alias_password' // and change password here
  }
}
```

- create assets folder here:
  android/app/src/main/assets

- run:
```bash
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

- run create app:
```bash
cd android
./gradlew assembleRelease
```

- delete password from signingConfigs:
  ```js
  signingConfigs {
    release {
      storeFile file('your_key_name.keystore')
      storePassword '####' // remove password from here
      keyAlias 'your_key_alias'
      keyPassword '####' // remove password from here
    }
  }
  ```
- DONE! App here:
android/app/build/outputs/apk/app-release.apk