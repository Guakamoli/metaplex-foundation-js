'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ProgramClient = require('./ProgramClient.cjs');

/** @group Plugins */

const programModule = () => ({
  install(metaplex) {
    const programClient = new ProgramClient.ProgramClient(metaplex);

    metaplex.programs = () => programClient;
  }

});

exports.programModule = programModule;
//# sourceMappingURL=plugin.cjs.map
