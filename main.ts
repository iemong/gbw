const processResolve = async (p: Deno.Process) => {
  const { code } = await p.status();
  const rawOutput = await p.output();
  const rawError = await p.stderrOutput();

  if (code === 0) {
    const result = new TextDecoder().decode(rawOutput);
    return { code, result };
  } else {
    const result = new TextDecoder().decode(rawError);
    console.error(result);
    return { code, result };
  }
};

const getGitBranch = () => {
  const p = Deno.run({
    cmd: ["git", "symbolic-ref", "--short", "HEAD"],
    stdout: "piped",
    stderr: "piped",
  });
  return processResolve(p);
};

const openCurrentBranch = (branchName: string) => {
  const p = Deno.run({
    cmd: ["gh", "repo", "view", "-b", branchName, "-w"],
    stdout: "piped",
    stderr: "piped",
  });
  return processResolve(p);
};

const { code, result: branchName } = await getGitBranch();
await openCurrentBranch(branchName);

Deno.exit(code);
