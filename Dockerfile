FROM registry.access.redhat.com/ubi8/nodejs-16 as builder

# Install chrome
USER root
COPY repos/*.repo /etc/yum.repos.d/
RUN dnf -y install xdg-utils liberation-fonts google-chrome

# Install app dependencies
COPY --chown=1001:0 . $APP_ROOT
RUN ln -sf /usr/share/zoneinfo/Europe/Stockholm /etc/localtime
RUN npm install

# Clean up
RUN dnf remove unzip -y && \
    dnf clean all && \
    rm -rf /var/cache/* && \
    rm -rf node_modules/*

USER 1001

ENTRYPOINT ["npm", "run", "start", "--"]
