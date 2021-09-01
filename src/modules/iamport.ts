export const userCode = 'DATA REDACTED';

export function importIamport() {
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.js';
    document.head.appendChild(jqueryScript);

    const iamportScript = document.createElement('script');
    iamportScript.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
    document.head.appendChild(iamportScript);
}
