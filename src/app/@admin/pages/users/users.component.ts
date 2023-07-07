import { IRegisterForm } from './../../../@core/interfaces/register.interface';
import { UsersAdminService } from './users-admin.service';
import { Component, OnInit } from '@angular/core';
import { IResultData } from '@core/interfaces/result-data.interface';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { USERS_LIST_QUERY } from '@graphql/operations/query/user';
import { optionsWithDetails, userFormBasicDialog } from '@shared/alerts/alerts';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.confing';
import { DocumentNode } from 'graphql';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  query: DocumentNode = USERS_LIST_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>;
  constructor(private service: UsersAdminService) {}

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 15;
    this.resultData = {
      lisKey: 'users',
      definitionKey: 'users',
    };
    this.include = true;
    this.columns = [
      {
        property: 'id',
        label: '#',
      },
      {
        property: 'name',
        label: 'Nombre',
      },
      {
        property: 'lastname',
        label: 'Apellidos',
      },
      {
        property: 'email',
        label: 'Correo electrónico',
      },
      {
        property: 'role',
        label: 'Permisos',
      },
    ];
  }
  private initializeForm(user: any) {
    const defaultName =
      user.name !== undefined && user.name !== '' ? user.name : '';
    const defaulLastname =
      user.lastname !== undefined && user.lastname !== '' ? user.lastname : '';
    const defaultEmail =
      user.email !== undefined && user.email !== '' ? user.email : '';
    const roles = new Array(2);
    roles[0] =
      user.role !== undefined && user.role === 'ADMIN' ? 'selected' : '';
    roles[1] =
      user.role !== undefined && user.role === 'CLINET' ? 'selected' : '';

    return `
    <input id="name" value="${defaultName}" class="swal2-input" placeholder="Usuario" required>
    <input id="lastname" value="${defaulLastname}" class="swal2-input" placeholder="Apellidos" required>
    <input id="email" value="${defaultEmail}" class="swal2-input" placeholder="Correo Electronico" required>
    <select id="role" class="swal2-input">
         <option value="ADMIN" ${roles[0]}>Administrador</option>
         <option value="CLINET" ${roles[1]}>Cliente</option>
    </select>


    `;
  }

  async takeAction($event) {
    // coger la informacion para la acciones
    const action = $event[0];
    const user = $event[1];

    // cogemos el valorpor defecto
    // const defaultValue =
    //   genre.name !== undefined && genre.name !== '' ? genre.name : '';
    // const html = `<input id="name" value="${defaultValue}" class="swal2-input" required>`;

    const html = this.initializeForm(user);

    // Teniedo en cuenta el caso ejecutar una acion
    switch (action) {
      case 'add':
        // Añadir el item
        this.addForm(html);
        break;
      case 'edit':
        this.updateForm(html, user);
        break;
      case 'info':
        const result = await optionsWithDetails(
          'Detalles',
          `${user.name} ${user.lastname}<br/>
          <i class="fas fa-mail-bulk"></i>&nbsp;${user.email}&nbsp;&nbsp;
          `,
          350,
          '<i class="fas fa-edit"></i>Editar',
          '<i class="fas fa-lock"></i> Bloquear'
        );
        if (result) {
          this.updateForm(html, user);
        } else if (result === false) {
          this.blockForm(user);
        }
        break;
      case 'block':
        this.blockForm(user);
        break;
      default:
        break;
    }
  }

  private async addForm(html: string) {
    const result = await userFormBasicDialog('Añadir usuario', html);
    console.log(result);
    this.addUser(result);
  }
  private addUser(result) {
    if (result.value) {
      const user: IRegisterForm = result.value;
      user.password = '12345';
      user.active = false;
      this.service.register(user).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }
  private async updateForm(html: string, user: any) {
    const result = await userFormBasicDialog('Modificar usuario', html);
    console.log(result);
    this.updateUser(result, user.id);
  }
  private updateUser(result, id: string) {
    if (result.value) {
      const user = result.value;
      user.id = id;
      console.log(user);
      this.service.update(result.value).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }
  private async blockForm(user: any) {
    const result = await optionsWithDetails(
      '¿Bloquear?',
      `Si bloqueas el usuario seleccionado, no se mostrara en la lista `,
      430,
      'No, no Bloquear',
      'Si Bloquear'
    );
    if (result === false) {
      this.blockUser(user.id);
    }
  }
  private blockUser(id: string) {
    this.service.block(id).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }
}
