export default function () {
  if (PROD) {
    const logo = `
_________________________________________________________________________________
___________               ___________.__                                __   
\______   \ ____ ___.__. \_   _____/|  |   ____   _____   ____   _____/  |_ 
 |    |  _//  _ <   |  |  |    __)_ |  | _/ __ \ /     \_/ __ \ /    \   __\
 |    |   (  <_> )___  |  |        \|  |_\  ___/|  Y Y  \  ___/|   |  \  |  
 |______  /\____// ____| /_______  /|____/\___  >__|_|  /\___  >___|  /__|  
        \/       \/              \/           \/      \/     \/     \/                            
_______________________________________________________________________________
                               author: nianwan
`;

    const rainbowGradient = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 16px; 
line-height: 1;
font-family: monospace;
font-weight: 600;
`;

    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.log('[EricUI]:dev mode...');
  }
}
