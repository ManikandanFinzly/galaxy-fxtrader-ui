import 'zone.js';
import * as singleSpa from 'single-spa'; // waiting for this to be merged: https://github.com/CanopyTax/single-spa/pull/156
import { GlobalEventDistributor } from './globalEventDistributor'
import { loadApp } from './helper'

async function init() {
    const globalEventDistributor = new GlobalEventDistributor();

    // seed: The URL "/entity/..." is being redirected to "http://localhost:9007/..." this is done by the webpack proxy (webpack.config.js)
    await loadApp('appname', '/appname', '/appname/singleSpaEntry.js', '/appname/store.js', globalEventDistributor);

    singleSpa.start();
}

init();

