import { Dimensions, StyleSheet } from 'react-native';

const windowHeight = Dimensions.get('window').height;

export const inputStyles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 50,
    marginTop: 5,
    borderRadius: 3,
    marginBottom: 5,
    borderWidth: 1,
    padding: 10,
    fontSize: 13,
  },
  label: {
    fontWeight: '700',
    marginBottom: 5,
    fontSize: 15,
  },
  error: {
    fontWeight: '500',
    color: 'red',
    marginBottom: 5,
  },
});

export const buttonStyles = StyleSheet.create({
  button: {
    padding: 15,
    textAlign: 'center',
    fontWeight: 600,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 8,
  },
});

export const createEditStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  inner: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 30,
    marginTop: 20,
  },
});

export const itemStyles = StyleSheet.create({
  item: {
    padding: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  text: {
    fontSize: 14,
    color: '#9a9a9a',
    fontWeight: '600',
  },
});

export const bankListStyles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#00000019',
  },
});

export const mainStyles = StyleSheet.create({
  container: {
    height: windowHeight,
    backgroundColor: 'white',
  },
  inner: {
    height: windowHeight - 150,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'space-between',
  },
  list: {
    maxHeight: windowHeight - 400,
    borderWidth: 1,
    borderColor: '#00000019',
  },
});

export const toastStyles = StyleSheet.create({
  container: {
    height: 'auto',
    width: 200,
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 2,
    justifyContent: 'center',
    padding: 10,
    top: 10,
    opacity: 1,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export const actionsheetStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: '#00000072',
  },
  inner: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    bottom: 0,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    paddingBottom: 10,
  },
  closeButton: {
    padding: 15,
    alignItems: 'flex-end',
  },
  textContainer: {
    maxHeight: 120,
    borderColor: '#00000019',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  text: {
    textAlign: 'center',
    marginHorizontal: 35,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    marginHorizontal: 20,
  },
});

export const showStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: windowHeight - 125,
    justifyContent: 'space-between',
  },
  inner: {
    padding: 30,
  },
  idText: {
    fontSize: 26,
    fontWeight: '600',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  infoLabel: {
    color: '#878787',
    fontWeight: '600',
    width: '40%',
  },
  infoValue: {
    fontWeight: '600',
    flexShrink: 1,
  },
  infoImage: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
