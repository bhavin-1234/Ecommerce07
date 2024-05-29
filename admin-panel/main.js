// import { loadHTML } from './htmlLoader.js';
// import util from 'util';
// import nwGui from 'nw.gui';

// async function main() {
//     const htmlContent = await loadHTML();
//     if (typeof process !== 'undefined') {
//         const moduleFolder = nwGui.App.argv[0];
//         try {
//             require(moduleFolder);
//         } catch (e) {
//             if (process.platform !== 'win32') {
//                 util.log('nw-pre-gyp error:');
//                 util.log(e.stack);
//             }
//             process.exit(1);
//         }
//         process.exit(0);
//     } else {
//         // If not running in NW.js environment, display the HTML content
//         document.body.innerHTML = htmlContent;
//     }
// }

// main();