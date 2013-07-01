require([
  "app",
  "handlebars"
], function(app, Handlebars) {

  //Raw handlebars data, helpful with data types
  Handlebars.registerHelper('raw', function(data) {
    return data && new Handlebars.SafeString(data);
  });

  Handlebars.registerHelper('number', function(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  });

  Handlebars.registerHelper('resource', function(name) {
    return app.RESOURCES_URL + name;
  });

  Handlebars.registerHelper('capitalize', function(string) {
    return app.capitalize(string);
  });

  Handlebars.registerHelper('bytesToSize', function(bytes) {
    return app.bytesToSize(bytes, 0);
  });

  Handlebars.registerHelper('contextualDate', function(date) {
    return new Handlebars.SafeString('<div class="contextual-date" title="'+ new Date(date+'Z') +'">'+app.contextualDate(date)+'</div>');
  });

  Handlebars.registerHelper('avatarSmall', function(userId) {
    return '<img src="' + app.users.get(userId).get('avatar') + '" style="margin-right:7px;" class="avatar">' + app.users.get(userId).get('first_name');
  });

  Handlebars.registerHelper('activeMap', function(model) {
    switch (model.get('active')) {
      case 0:
        return 'deleted';
      case 1:
        return 'active';
      case 2:
        return 'inactive';
    }
  });

  // Should be combined with userShort below with param: "show_avatar" [true,false]
  Handlebars.registerHelper('userName', function(userId) {
    if (!_.isNumber(userId) || _.isNaN(userId)) return;
    var user = app.users.get(userId);
    //if (user === undefined) return undefined;
    var firstName = user.get('first_name').toLowerCase();
    var lastNameFirstCharacter = user.get('last_name').toLowerCase().charAt(0);
    var nickName = firstName;
    var hit = app.users.find(function(model) {
      return model.get('first_name').toLowerCase() === firstName && model.id != userId;
    });
    if (hit !== undefined) {
      nickName = firstName + ' ' + lastNameFirstCharacter + '.';
      hit = app.users.find(function(model) { return model.get('first_name').toLowerCase() === firstName && model.get('last_name').toLowerCase().charAt(0) === lastNameFirstCharacter && model.id != userId; });
      if (hit !== undefined) {
        nickName = firstName + ' ' + user.get('last_name');
      }
    }
    return new Handlebars.SafeString(app.capitalize(nickName," "));
  });

  Handlebars.registerHelper('userShort', function(userId) {
    if (!_.isNumber(userId) || _.isNaN(userId)) return;
    var user = app.users.get(userId);
    //if (user === undefined) return undefined;
    var firstName = user.get('first_name').toLowerCase();
    var lastNameFirstCharacter = user.get('last_name').toLowerCase().charAt(0);
    var nickName = firstName;
    var hit = app.users.find(function(model) {
      return model.get('first_name').toLowerCase() === firstName && model.id != userId;
    });
    if (hit !== undefined) {
      nickName = firstName + ' ' + lastNameFirstCharacter + '.';
      hit = app.users.find(function(model) { return model.get('first_name').toLowerCase() === firstName && model.get('last_name').toLowerCase().charAt(0) === lastNameFirstCharacter && model.id != userId; });
      if (hit !== undefined) {
        nickName = firstName + ' ' + user.get('last_name');
      }
    }
    return new Handlebars.SafeString('<img src="'+user.get('avatar')+'" class="avatar"/>' + app.capitalize(nickName," "));
  });

  Handlebars.registerHelper('userAvatar', function(userId) {
    var user = app.users.get(userId);
    return new Handlebars.SafeString('<img src="'+user.get('avatar')+'" class="avatar"/>');
  });

  Handlebars.registerHelper('userFull', function(userId) {
    var user = app.users.get(userId);
    return new Handlebars.SafeString('<img src="'+user.get('avatar')+'"  class="avatar"/>'+user.get('first_name')+' '+user.get('last_name'));
  });

  Handlebars.registerHelper('directusTable', function(data) {

    if (data === undefined || !data.length) return;

    var headers = _.keys(data[0]);

    var headersTH = _.map(headers, function(header) { return '<th>' + app.capitalize(header, '_') + '</th>'; });

    var tHead = '<thead><tr>' + headersTH.join('') + '</tr></thead>';

    var tableRows = _.map(data, function(row) {
      //wrap values in td
      var values = _.values(row);
      var tds = _.map(values, function(value) { return '<td>' + value + '</td>'; });
      return '<tr>' + tds.join('') + '</tr>';
    });

    var tBody = '<tbody>' + tableRows.join('') + '</tbody>';

    var table = '<table class="table table-striped directus-table">' + tHead + tBody + '</table>';

    return new Handlebars.SafeString(table);
  });

  Handlebars.registerHelper('directusTable', function(data) {

    if (data === undefined || !data.length) return;

    var headers = _.keys(data[0]);

    var headersTH = _.map(headers, function(header) { return '<th>' + app.capitalize(header, '_') + '</th>'; });

    var tHead = '<thead><tr>' + headersTH.join('') + '</tr></thead>';

    var tableRows = _.map(data, function(row) {
      //wrap values in td
      var values = _.values(row);
      var tds = _.map(values, function(value) { return '<td>' + value + '</td>'; });
      return '<tr>' + tds.join('') + '</tr>';
    });

    var tBody = '<tbody>' + tableRows.join('') + '</tbody>';

    var table = '<table class="table table-striped directus-table">' + tHead + tBody + '</table>';

    return new Handlebars.SafeString(table);
  });

  Handlebars.registerHelper('directusSelect', function(data) {
    if (data === undefined) return;

    var data = data.options;
    var name = data.name;

    console.log(data, name);

    var options = _.map(data, function(item) {
      var selected = item.selected ? 'selected' : '';
      return '<option value="' + item.name + '" ' + selected + '>' + item.title + '</option>';
    });

    var select = '<select id="' + name + '">' + options.join('') + '</select>';

    return new Handlebars.SafeString(select);
  });

});