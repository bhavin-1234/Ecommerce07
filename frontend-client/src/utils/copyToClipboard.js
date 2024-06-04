// export const copyToClipboard = (text) => {
import { toast } from 'react-toastify';
//     try {
//         var textField = document.createElement('textarea')
//         textField.innerText = text
//         document.body.appendChild(textField)
//         textField.select()
//         document.execCommand('copy')
//         textField.remove()
//         alert("copied to clipboard");
//     } catch (error) {
//         console.error("Unable to copy to clipboard", error);
//         alert("copy to clipboard failed!");

//     }
// };


export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        toast.success("copied to clipboard Successfully!");
    } catch (error) {
        console.error("Unable to copy to clipboard", error);
        toast.error("Something Went Wrong!");
    }
};
