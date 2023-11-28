# How to use

```js
const Biscuit = <View />

export default () => (
  <View>
    <PortalGate gateName={'bag'}>
      {teleportFN => (
        <TouchableOpacity onPress={() => teleportFN("jar", Biscuit)} >
          <Text>LET THE MAGIC BEGIN</Text>
        </TouchableOpacity>
      )}
    </PortalGate>
  </View>
)
```
