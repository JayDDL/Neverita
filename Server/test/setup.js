const { spawn } = require('child_process');

beforeAll(() => {
  const devProcess = spawn('npm', ['run', 'dev', '--', ' test'], {
    stdio: 'inherit',
  });

  devProcess.on('exit', (code) => {
    if (code !== 0) {
      throw new Error(`dev script exited with code ${code}`);
    }
  });
});