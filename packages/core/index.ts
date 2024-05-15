import { makeInstaller } from '@boy-element/utils';

import components from './components';
import '@boy-element/theme/index.css';

const installer = makeInstaller(components);

export * from '@boy-element/components';
export default installer;
