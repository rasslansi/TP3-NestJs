import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todoModule';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUserMiddleware } from './Middlewares/auth.middleware';
import { Skill } from './GestionCV/skill/entities/skill.entity';
import { TodoEntity } from './todo/Entities/todoEntity';
import { User } from './GestionCV/user/entities/user.entity';
import { Cv } from './GestionCV/cv/entities/cv.entity';
import { CvModule } from './GestionCV/cv/cv.module';
import { SkillModule } from './GestionCV/skill/skill.module';
import { UserModule } from './GestionCV/user/user.module';

@Module({
  imports: [
    TodoModule,
    CommonModule,
    CvModule,
    SkillModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '',
      database: 'tpnest',
      entities: [User, Cv, Skill, TodoEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthUserMiddleware).forRoutes('v2/todo');
  }
}
