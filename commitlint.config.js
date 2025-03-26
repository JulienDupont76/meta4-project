export default {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'subject-max-length': [2, 'always', 100],
		'type-enum': [
			2,
			'always',
			['feat', 'fix', 'docs', 'chore', 'refactor', 'test', 'build'],
		],
		'scope-enum': [
			2,
			'always',
			['mobile', 'backend', 'AI', 'IOT', 'docs', 'test', 'build', 'global'],
		],
		'subject-case': [2, 'always', 'sentence-case'],
		'subject-empty': [2, 'never'],
	},
};
