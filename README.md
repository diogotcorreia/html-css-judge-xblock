# html-css-judge-xblock

An OpenEdx XBlock that evaluates HTML and CSS code

## Build the judge Docker image

Run this from the root folder of the project, otherwise submissions won't work:

```bash
docker image build htmlcssjudge-docker -t 'htmlcssjudge:latest'
```

## Running this on OpenEdx devstack

Since this xblock creates docker containers, you'll need to send the docker socket
to the LMS and Studio containers.

For this, edit your `docker-compose.yml` file to include `/var/run/docker.sock:/var/run/docker.sock` as a volume.

```yaml
     volumes:
       - edxapp_lms_assets:/edx/var/edxapp/staticfiles/
+      - /var/run/docker.sock:/var/run/docker.sock
```

```yaml
     volumes:
       - edxapp_studio_assets:/edx/var/edxapp/staticfiles/
+      - /var/run/docker.sock:/var/run/docker.sock
```

## Useful links

- [OpenEdx Devstack](https://github.com/edx/devstack)
- [Deploy XBlock in Devstack](https://edx.readthedocs.io/projects/xblock-tutorial/en/latest/edx_platform/devstack.html)
