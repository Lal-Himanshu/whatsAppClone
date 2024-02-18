import {Text, StyleSheet} from 'react-native';

function ErrorText(props) {
  const {str} = props;
  return <Text style={styles.errors}>{str}</Text>;
}
const styles = StyleSheet.create({
  errors: {
    color: '#EE4B2B',
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 10,
  },
});
export default ErrorText;
