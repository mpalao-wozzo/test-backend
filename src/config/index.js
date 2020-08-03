import developmentConfig from './config.development';
import productionConfig from './config.production';

const conf = (env) => ('production' === env ? productionConfig : developmentConfig);

export default conf;
