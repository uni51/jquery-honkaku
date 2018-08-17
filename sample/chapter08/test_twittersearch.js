jQuery(function($) {
  $('#twitter-search-test').show();
/**/
QUnit.log(function() { console.log(arguments); });

module('�t�H�[���̃e�X�g', {
  setup:    function() {
    this.form = $('#twitter-search form');
    this.params = {
      q:           this.form.find('[name=q]'),
      result_type: this.form.find('[name=result_type]'),
      count:       this.form.find('[name=count]'),
      lang:        this.form.find('[name=lang]')
    };
  },
  teardown: function() { delete this.form;  delete this.params; }
});

test('�t�H�[���̍\��', 10, function() {
  var params = this.params;
  var form   = this.form;

  ok(/input/i.test(params.q.get(0).tagName),
      '�������[�h���̓t�B�[���h(q)��INPUT�^�O');
  equal(params.q.get(0).type, 'text',
      '�������[�h���̓t�B�[���h(q)�̓e�L�X�g');

  ok(/select/i.test(params.result_type.get(0).tagName),
      '�����Ώ�(result_type)��SELECT�^�O');
  ok(params.result_type.find('option').length > 0,
      '�����Ώ�(result_type)�ɂ�option���܂܂�Ă���');

  ok(/select/i.test(params.count.get(0).tagName),
      '1�y�[�W������̌���(count)��SELECT�^�O');
  ok(params.count.find('option').length > 0,
      '1�y�[�W������̌���(count)�ɂ�option���܂܂�Ă���');

  ok(/select/i.test(params.lang.get(0).tagName),
      '����(lang)��SELECT�^�O');
  ok(params.lang.find('option').length > 0,
      '����(lang)�ɂ�option���܂܂�Ă���');

  ok(form.find('input[type="submit"]').length === 1 && form.find('input[type="submit"]').val() == '����' ,
      '�����{�^����1���݂���');

  ok(form.find('input[type="reset"]').length === 1 && form.find('input[type="reset"]').val() == '�N���A' ,
      '�N���A�{�^����1���݂���');
});

test('�t�H�[���̏����l', 7, function() {
  var params = this.params;

  strictEqual(params.q.val().length, 0, '�������[�h�͓��͂���Ă��Ȃ�');

  deepEqual(params.result_type.find('option').map(function(tag) {
      return [[$(this).text(), this.value]]; }).get(),
      [['�ŐV', 'recent'], ['�g�b�v', 'popular']],
      '�����Ώ�(result_type)��option��[�ŐV, recent]��[�g�b�v, popular]');
  equal(params.result_type.val(), 'recent',
     '�����Ώ�(result_type)�̏����l��recent');

  deepEqual(params.count.find('option').map(function() {
      return [[$(this).text(), Number(this.value)]]; }).get(),
      [['5��', 5], ['10��', 10], ['20��', 20]],
      '1�y�[�W������̌���(count)��option��[5��, 5], [10��, 10], [20��, 20]');
  equal(params.count.val(), 5,
     '1�y�[�W������̌���(count)�̏����l��5');

  deepEqual(params.lang.find('option').map(function() {
      return [[$(this).text(), this.value]]; }).get(),
      [['���{��', 'ja'], ['English', 'en']],
      '����(lang)��option��[���{��, ja], [English, en]');
  equal(params.lang.val(), 'ja',
     '����(lang)�̏����l��ja');
});
/**/
/**/
module('�Ԃ₫�̃e�L�X�g��\���p�ɕҏW', {
  setup: function() {
    if (!TwitterSearch.view) TwitterSearch.init();
  }
});

test('�����N�̒ǉ�', function() {
  var renderText = TwitterSearch.renderText;
  equal(renderText('jQuery', '@gihyo'),
        '<a class="search" href="javascript:void(0);">@gihyo</a>',
        '@���[�U�[��(reply�܂���mention)�Ƀ����N��ǉ�');
  equal(renderText('jQuery', '#gihyo'),
        '<a class="search" href="javascript:void(0);">#gihyo</a>',
        '�n�b�V���^�O�Ƀ����N��ǉ�');
  equal(renderText('jQuery', 'http://gihyo.jp/'),
        '<a target="_blank" href="http://gihyo.jp/">http://gihyo.jp/</a>',
        '�O���T�C�g�ւ̃����N��ǉ�');
});

test('�L�[���[�h�̋���', function() {
  var renderText = TwitterSearch.renderText;
  var keyword = '"jQuery UI" OR jQuery';

  equal(renderText(keyword, 'jQuery jQuery UI'),
        '<span class="query">jQuery</span> ' +
        '<span class="query">jQuery UI</span>',
      '�L�[���[�h�̋���("�`"�ւ̑Ή�)');
  equal(renderText(keyword, 'jquery jquery ui'),
        '<span class="query">jquery</span> ' +
        '<span class="query">jquery ui</span>',
      '�L�[���[�h�̋���(������)');
  equal(renderText(keyword, 'JQUERY JQUERY ui'),
        '<span class="query">JQUERY</span> ' +
        '<span class="query">JQUERY ui</span>',
      '�L�[���[�h�̋���(�啶���E����������)');
  equal(renderText(keyword, 'jQuery UI @jQuery'),
        '<span class="query">jQuery UI</span> ' +
        '<a class="search" href="javascript:void(0);">@<span class="query">jQuery</span></a>',
      '�����N���ł��L�[���[�h����(@���[�U�[��)');
  equal(renderText(keyword, 'jQuery UI #jQuery'),
        '<span class="query">jQuery UI</span> ' +
        '<a class="search" href="javascript:void(0);">#<span class="query">jQuery</span></a>',
      '�����N���ł��L�[���[�h����(#�n�b�V���^�O)');
  equal(renderText(keyword, 'http://jqueryui.com/ http://jquery.com/'),
        '<a target="_blank" href="http://jqueryui.com/">http://<span class="query">jquery</span>ui.com/</a> ' +
        '<a target="_blank" href="http://jquery.com/">http://<span class="query">jquery</span>.com/</a>',
      '�����N���ł��L�[���[�h����(�O���T�C�g)');
});
/**/
/**/
module('������̉�ʕ\���̃e�X�g', {
  setup:    function() {
    if (!TwitterSearch.view) TwitterSearch.init();
    this.form      = $('#twitter-search form');
    this.result    = $('#twitter-search-result');
    this.queryList = this.result.find('.query-list');
    this.paginate  = this.result.find('.paginate');
  },
  teardown: function() {
    delete this.form;
    delete this.result;
    delete this.queryList;
    delete this.paginate;
  }
});

test('��������O', function() {
  var result    = this.result;
  var queryList = this.queryList;
  var paginate  = this.paginate;

  strictEqual(TwitterSearch.cache, null,
      '�f�[�^�L���b�V����null');
  strictEqual(queryList.find('a.search').length, 0,
      '�L�[���[�h���X�g�̃����N�͑��݂��Ȃ�');
  strictEqual(paginate.find('a').length, 0,
      '�y�[�W����̃����N�͑��݂��Ȃ�');
  strictEqual(result.find('p.tweet').length, 0,
      '�Ԃ₫�͕\������Ă��Ȃ�');
});

asyncTest('�ŏ��̌�������', function() {
  var form      = this.form;
  var result    = this.result;
  var queryList = this.queryList;
  var paginate  = this.paginate;
  var keyword   = 'jQuery';

  form.find('[name=q]').val(keyword);
  TwitterSearch.search();

  setTimeout(function() {
    notStrictEqual(TwitterSearch.cache, null,
        '�f�[�^�L���b�V����null�ł͂Ȃ��Ȃ���');
    equal(queryList.find('a').length, 1,
        '�L�[���[�h���X�g��1�ǉ����ꂽ');
    deepEqual(queryList.find('a.search').map(function() {
                return $(this).text(); }).get(), [keyword],
        '�L�[���[�h���X�g��jQuery�̂�');

    deepEqual(paginate.find('a').map(function() {
                return [[this.className, $(this).text()]]; }).get(),
      [['update', '�X�V'], ['next', '���� \u00bb']],
      '�u�X�V�v�u���ցv�̃����N���ǉ����ꂽ');

    equal(result.find('p.tweet').length,
          form.find('[name=count]').val(),
          '�\�������Ԃ₫�̐��̓t�H�[���Őݒ肵���l�Ɠ���');
    start();
  }, 3000);
});

asyncTest('2�y�[�W��', function() {
  var form    = this.form;
  var result    = this.result;
  var paginate  = this.paginate;
  var cache     = TwitterSearch.cache;

  ok(cache.search_metadata.since_id === 0, '����1�y�[�W��');

  paginate.find('a.next').click();

  setTimeout(function() {
    ok(TwitterSearch.cache.search_metadata.max_id < cache.search_metadata.max_id, '2�y�[�W��');
    notDeepEqual(cache.statuses, TwitterSearch.cache.statuses, '�Ԃ₫�̓��e���ω����Ă���');
    deepEqual(paginate.find('a').map(function() {
      return [[this.className, $(this).text()]]; }).get(),
      [['update', '�X�V'], ['next', '���� \u00bb']],
      '�y�[�W����̃����N�͕ω����Ȃ�');
    equal(result.find('p.tweet').length, form.find('[name=count]').val(),
      '�Ԃ₫�̐��̓t�H�[���̐ݒ�Ɠ���');

    start();
  }, 3000);
});
/**/
});
