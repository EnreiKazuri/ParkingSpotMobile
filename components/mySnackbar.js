import React, {useState} from "react";
import { Snackbar } from "react-native-paper";

const MySnackBar = ({ message }) => {
    const [visible, setVisible] = useState(false);
    const toggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    return (
        <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        style={{ backgroundColor: '#D1312A'}}
        >
        {message}
        </Snackbar>
    );
}

export default MySnackBar;