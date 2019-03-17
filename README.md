# FileDrop

FileDrop is a simple NodeJS application to upload and share files on local networks.

![Screenshot](screenshot.png)

# Installing

## Locally

To use locally, you just need a recent (>8) NodeJS installation and to install the application.

```bash
npm install -g @zix99/filedrop
filedrop --target /path/to/savedir
```

## Docker

```bash
docker run -d -p 8080:8080 zix99/filedrop:latest
```

# Configuration

Filedrop uses the [rc](https://www.npmjs.com/package/rc) module for configuration.  To configure, simply use environment variables like `filedrop_`, use a `.filedroprc` file, or simply change `config.js`.

# License

[MIT](LICENSE.md)
