import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const ExplanationModal = ({ isVisible, onClose }) => {
    return (
        <Modal transparent={true} visible={isVisible} animationType="fade">
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Understanding Scores</Text>
                    <Text style={styles.message}>
                        - Polarity: Indicates the sentiment of the article (-1: Negative, 1: Positive).{'\n'}
                        - Subjectivity: Reflects how objective (0) or subjective (1) the article is.
                    </Text>
                    <Button title="Got it!" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        lineHeight: 24,
    },
});

export default ExplanationModal;
