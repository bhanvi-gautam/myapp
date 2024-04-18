import CryptoJS from 'crypto-js';

const secretKey='6d090796-ecdf-11ea-adc1-0242ac112345';

export const encryptData= (data)=> {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encryptedData;
};

export const decryptData= (encryptedData)=> {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
    let decryptedObject;
    try {
        decryptedObject = JSON.parse(decryptedData);
    } catch (error) {
        // Handle JSON parsing error if needed
        console.error('Failed to parse decrypted data:', error);
        return null;
    }
    return decryptedObject;
};