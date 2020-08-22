#!/bin/sh
curl -Ls https://repo1.maven.org/maven2/org/mindrot/jbcrypt/0.4/jbcrypt-0.4.jar -o jbcrypt-0.4.jar
"$JBOSS_HOME"/bin/jboss-cli.sh --command="module add --name=org.mindrot.jbcrypt --resources=jbcrypt-0.4.jar"
curl -Ls https://github.com/leroyguillaume/keycloak-bcrypt/releases/download/1.4.0/keycloak-bcrypt-1.4.0.jar -o "$JBOSS_HOME"/standalone/deployments/keycloak-bcrypt-1.4.0.jar
