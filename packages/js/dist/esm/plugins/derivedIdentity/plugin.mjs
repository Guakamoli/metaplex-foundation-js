import { DerivedIdentityClient } from './DerivedIdentityClient.mjs';

/** @group Plugins */

const derivedIdentity = () => ({
  install(metaplex) {
    const derivedIdentityClient = new DerivedIdentityClient(metaplex);

    metaplex.derivedIdentity = () => derivedIdentityClient;
  }

});

export { derivedIdentity };
//# sourceMappingURL=plugin.mjs.map
