INSERT INTO `achievement_badges` (name, image) VALUES
('HighKD','https://www.flaticon.com/svg/static/icons/svg/3951/3951948.svg'),
('Head Hunter','https://www.flaticon.com/svg/static/icons/svg/1596/1596880.svg'),
('Bad Shot','https://www.flaticon.com/svg/static/icons/svg/601/601932.svg'),
('Sharp Shooter','https://www.flaticon.com/svg/static/icons/svg/2913/2913517.svg'),
('Shot Fired!','https://www.flaticon.com/svg/static/icons/svg/3588/3588276.svg');

INSERT INTO `achievements` (badge_id, frequency, starts_on, ends_on, category, category_ratio) VALUES
(1, 'yearly', '2021-01-01', '2021-12-31', 'kdratio', 1),
(2, 'yearly', '2021-01-01', '2021-12-31', 'headshots', 10),
(3, 'yearly', '2021-01-01', '2021-12-31', 'accuracy', 1),
(4, 'yearly', '2021-01-01', '2021-12-31', 'sharpshooter', 0),
(5, 'yearly', '2021-01-01', '2021-12-31', 'shotfired', 0);