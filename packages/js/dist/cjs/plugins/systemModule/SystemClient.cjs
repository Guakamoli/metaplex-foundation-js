'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SystemBuildersClient = require('./SystemBuildersClient.cjs');
var createAccount = require('./operations/createAccount.cjs');
var transferSol = require('./operations/transferSol.cjs');

/**
 * This is a client for the System module.
 *
 * It enables us to interact with the System program in order to
 * create uninitialized accounts and transfer SOL.
 *
 * You may access this client via the `system()` method of your `Metaplex` instance.
 *
 * ```ts
 * const systemClient = metaplex.system();
 * ```
 *
 * @example
 * You can create a new uninitialized account with a given space in bytes
 * using the code below.
 *
 * ```ts
 * const { newAccount } = await metaplex.system().createAccount({ space: 42 });
 * ```
 *
 * @group Modules
 */

class SystemClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }
  /**
   * You may use the `builders()` client to access the
   * underlying Transaction Builders of this module.
   */


  builders() {
    return new SystemBuildersClient.SystemBuildersClient(this.metaplex);
  }
  /** {@inheritDoc createAccountOperation} */


  createAccount(input) {
    return this.metaplex.operations().getTask(createAccount.createAccountOperation(input));
  }
  /** {@inheritDoc transferSolOperation} */


  transferSol(input) {
    return this.metaplex.operations().getTask(transferSol.transferSolOperation(input));
  }

}

exports.SystemClient = SystemClient;
//# sourceMappingURL=SystemClient.cjs.map
