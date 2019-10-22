#!/usr/bin/env python3

import argparse
import json
import sys
from pathlib import Path
import http.client


# Test we can use this on api
def assert_can_connect(domain, cert_file, key_file):
    print("Testing cert/key with " + domain + "... ", end="")
    conn = http.client.HTTPSConnection(domain, 443,
                                       key_file=key_file,
                                       cert_file=cert_file)
    conn.request("GET", "/magma/networks")
    resp = conn.getresponse()
    if resp.status != 200:
        print("Failed: got code " + str(resp.status))
        sys.exit(1)
    print("Success")


def secrets_put_request(cert_file, key_file, session_token):
    return json.dumps({
        "api_cert": Path(cert_file).read_text(),
        "api_private_key": Path(key_file).read_text(),
        "session_token": session_token,
    })


parser = argparse.ArgumentParser(description='Get commands to update secrets.')
parser.add_argument('cert_file', help='Path to certificate file')
parser.add_argument('key_file', help='Path to private key file')
parser.add_argument('session_token', help='The session token to use')

args = parser.parse_args()

assert_can_connect('api.magma.etagecom.io', args.cert_file, args.key_file)
assert_can_connect('api-staging.magma.etagecom.io', args.cert_file,
                   args.key_file)

data = secrets_put_request(args.cert_file, args.key_file, args.session_token)
print("For information working with production, see "
      "https://fburl.com/fbc_platform_production.")
print("Notably, if using aws-vault, you should precede commands with"
      " `aws-vault exec phb-mfa`.")
print()
print("Run this command in phb aws account:")
print("  aws secretsmanager put-secret-value --secret-id phb/apps"
      " --secret-string '" + data + "'")
print()
print("Then plan/apply the terraform config (be sure nothing else changes):")
print("  terraform plan")
print("  terraform apply")
print("The secrets will be applied on the next helm build/release")
