# -*- coding: utf-8 -*-

from odoo import models, fields, api
from odoo.exceptions import ValidationError

class Calls(models.Model):
    _name = 'iti.session1.calls'
    _description = 'CDR'

    start_time = fields.Datetime()
    stop_time = fields.Datetime()
    duration = fields.Float(compute="_compute_duration",store=True)
    # store=True for graph field 3ashan maynfa3sh tetbana 3ala computed fields
    source = fields.Char()
    destination = fields.Char()
    name = fields.Char(default='New')
    station = fields.Many2one(comodel_name='iti.session1.station')
    tags = fields.Many2many(comodel_name='iti.session1.tags')
    state = fields.Selection([
    ('draft', 'Draft'),
    ('invoiced', 'Invoiced'),
    ], default='draft', string='Status')
    
    @api.constrains('stop_time')
    def _check_stop_time(self):
        for record in self:
            if record.stop_time < record.start_time:
                raise ValidationError('stop time should be bigger than start time!')
    
    

    @api.depends('start_time','stop_time')

    def _compute_duration(self):
        for rec in self:
            if(rec.start_time and rec.stop_time):
                rec.duration = (rec.stop_time - rec.start_time).seconds /60



class Station (models.Model):
    _name='iti.session1.station'

    name = fields.Char()
    calls = fields.One2many(comodel_name='iti.session1.calls',inverse_name='station')


class Tags(models.Model):
     _name = 'iti.session1.tags'
     
     name = fields.Char()
# class call_center_2(models.Model):
#     _name = 'call_center_2.call_center_2'
#     _description = 'call_center_2.call_center_2'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         for record in self:
#             record.value2 = float(record.value) / 100
